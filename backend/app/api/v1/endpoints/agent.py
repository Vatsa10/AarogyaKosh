from fastapi import APIRouter, Depends, HTTPException
from app.services.auth_service import AuthService
from app.services.agent_service import AgentService
from app.models.health_monitoring import HealthLog, HealthGoal, AIInsight, AppointmentProposal
from app.schemas import HealthLogCreate, HealthGoalCreate
from typing import List

router = APIRouter(prefix="/agent", tags=["Agent"])

@router.post("/log")
async def create_daily_log(
    data: HealthLogCreate,
    current_user = Depends(AuthService.get_current_user)
):
    log = HealthLog(
        user_id=str(current_user.id),
        **data.dict()
    )
    await log.insert()
    
    # Proactively check for new insights after logging
    # We can run this in background if it's too slow
    insight = await AgentService.generate_health_insights(str(current_user.id))
    
    return {"status": "success", "log_id": str(log.id), "latest_insight": insight}

@router.get("/dashboard")
async def get_agent_dashboard(
    current_user = Depends(AuthService.get_current_user)
):
    return await AgentService.get_current_status(str(current_user.id))

@router.post("/goals")
async def set_health_goal(
    data: HealthGoalCreate,
    current_user = Depends(AuthService.get_current_user)
):
    goal = HealthGoal(
        user_id=str(current_user.id),
        **data.dict()
    )
    await goal.insert()
    return {"status": "success", "goal_id": str(goal.id)}

@router.get("/insights", response_model=List[AIInsight])
async def get_all_insights(
    current_user = Depends(AuthService.get_current_user)
):
    return await AIInsight.find(AIInsight.user_id == str(current_user.id)).sort("-timestamp").to_list()

@router.post("/appointment/{proposal_id}/action")
async def act_on_proposal(
    proposal_id: str,
    action: str, # "schedule", "dismiss"
    current_user = Depends(AuthService.get_current_user)
):
    prop = await AppointmentProposal.get(proposal_id)
    if not prop or prop.user_id != str(current_user.id):
        raise HTTPException(status_code=404, detail="Proposal not found")
    
    if action == "schedule":
        prop.status = "scheduled"
    elif action == "dismiss":
        prop.status = "dismissed"
    
    await prop.save()
    return {"status": "updated"}
