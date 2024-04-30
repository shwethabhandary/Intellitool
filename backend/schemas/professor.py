from pydantic import BaseModel, Field
from typing import List

class AddProfessor(BaseModel):
    name: str
    description: str = None
    courses: List[int] = Field(default=[])
    field: str

