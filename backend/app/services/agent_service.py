from app.services.ai_service import initialize_model
from app.models.health_monitoring import HealthLog, AIInsight, HealthGoal, AppointmentProposal
from app.models.medical_record import MedicalHistoryRecord
import json
from datetime import datetime, timedelta

class AgentService:
    @staticmethod
    async def generate_health_insights(user_id: str):
        """
        Analyzes recent health logs and history to generate proactive insights and risks.
        """
        # 1. Gather data
        one_week_ago = datetime.utcnow() - timedelta(days=7)
        logs = await HealthLog.find(
            HealthLog.user_id == user_id,
            HealthLog.timestamp >= one_week_ago
        ).sort("-timestamp").to_list()
        
        goals = await HealthGoal.find(
            HealthGoal.user_id == user_id,
            HealthGoal.is_active == True
        ).to_list()

        medical_history = await MedicalHistoryRecord.find_one(
            MedicalHistoryRecord.user_id == user_id
        )

        if not logs:
            return {"status": "skipped", "reason": "Insufficient data (no logs in last 7 days)"}

        # 2. Build the context for AI
        log_summary = "\n".join([
            f"- {l.timestamp.date()}: Sleep: {l.sleep_hours}h, Exercise: {l.exercise_minutes}min, Stress: {l.stress_level}/10"
            for l in logs[:7] # Last 7 entries
        ])
        
        goal_summary = "\n".join([f"- {g.goal_type}: {g.target_value or g.target_metric}" for g in goals])
        history_text = f"Allergies: {medical_history.allergy if medical_history else 'None'}, Conditions: {medical_history.chronic_condition if medical_history else 'None'}"

        prompt = f"""
        You are an Agentic AI Health Assistant for AarogyaKosh. 
        Analyze the user's weekly health patterns against their goals and medical history.
        Identify risks like burnout, cardiovascular strain, or poor recovery.

        USER DATA (Last 7 Days):
        {log_summary}

        USER GOALS:
        {goal_summary}

        MEDICAL HISTORY:
        {history_text}

        Rules:
        1. Be proactive and specific.
        2. If sleep is consistently low and stress high, flag a risk.
        3. Propose a doctor appointment ONLY if patterns look clinically concerning (e.g. repeated high stress/low sleep).

        RESPONSE FORMAT (Strict JSON):
        {{
            "summary": "1-2 sentence clinical summary of patterns.",
            "risk_level": "Normal" | "Elevated" | "Critical",
            "suggested_actions": ["tip 1", "tip 2"],
            "category": "pattern" | "risk" | "interaction",
            "propose_appointment": {{
                "needed": true/false,
                "specialty": "string",
                "reason": "string"
            }}
        }}
        """

        # 3. Request Inference
        pipe = await initialize_model()
        messages = [
            {
                "role": "user",
                "content": [{"type": "text", "text": prompt}]
            }
        ]
        
        # image-text-to-text models can process text-only prompts
        output = pipe(text=messages, max_new_tokens=800)
        raw_response = output[0]["generated_text"][-1]["content"]

        # 4. Parse and Persist
        try:
            start = raw_response.find('{')
            end = raw_response.rfind('}')
            if start != -1 and end != -1:
                data = json.loads(raw_response[start:end+1])
                
                insight = AIInsight(
                    user_id=user_id,
                    summary=data.get("summary", "Analysis complete."),
                    risk_level=data.get("risk_level", "Normal"),
                    suggested_actions=data.get("suggested_actions", []),
                    category=data.get("category", "pattern")
                )
                await insight.insert()
                
                if data.get("propose_appointment", {}).get("needed"):
                    prop = AppointmentProposal(
                        user_id=user_id,
                        doctor_specialty=data["propose_appointment"]["specialty"],
                        reason=data["propose_appointment"]["reason"],
                        status="suggested"
                    )
                    await prop.insert()
                
                return insight
        except Exception as e:
            print(f"Error parsing AI Insight: {e}\nRaw: {raw_response}")
            return {"status": "error", "message": "Failed to parse AI output"}

    @staticmethod
    async def get_current_status(user_id: str):
        """
        Combines latest logs, goals, and insights for the mobile dashboard.
        """
        latest_log = await HealthLog.find_one(HealthLog.user_id == user_id, sort=[("-timestamp", 1)])
        latest_insight = await AIInsight.find_one(AIInsight.user_id == user_id, sort=[("-timestamp", 1)])
        active_goals = await HealthGoal.find(HealthGoal.user_id == user_id, HealthGoal.is_active == True).to_list()
        pending_appointments = await AppointmentProposal.find(
            AppointmentProposal.user_id == user_id, 
            AppointmentProposal.status == "suggested"
        ).to_list()

        return {
            "latest_log": latest_log,
            "latest_insight": latest_insight,
            "active_goals": active_goals,
            "pending_proposals": pending_appointments
        }
