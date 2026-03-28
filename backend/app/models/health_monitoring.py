from beanie import Document, Link
from datetime import datetime
from typing import List, Optional, Literal
from app.models.user import User

class HealthLog(Document):
    user_id: str
    sleep_hours: float
    exercise_minutes: int
    diet_quality: int  # 1-10
    stress_level: int # 1-10
    notes: Optional[str] = None
    timestamp: datetime = datetime.utcnow()

    class Settings:
        name = "health_logs"

class HealthGoal(Document):
    user_id: str
    goal_type: Literal["weight_loss", "stress_reduction", "sleep_target", "exercise_consistency"]
    target_value: Optional[str] = None
    target_metric: Optional[float] = None
    current_value: Optional[float] = None
    is_active: bool = True
    created_at: datetime = datetime.utcnow()

    class Settings:
        name = "health_goals"

class AIInsight(Document):
    user_id: str
    summary: str
    risk_level: Literal["Normal", "Elevated", "Critical"]
    suggested_actions: List[str] = []
    category: Literal["pattern", "risk", "interaction"]
    is_read: bool = False
    timestamp: datetime = datetime.utcnow()

    class Settings:
        name = "ai_insights"

class AppointmentProposal(Document):
    user_id: str
    doctor_specialty: str
    reason: str
    status: Literal["suggested", "scheduled", "completed", "dismissed"]
    suggested_date: Optional[datetime] = None
    timestamp: datetime = datetime.utcnow()

    class Settings:
        name = "appointment_proposals"
