from enum import Enum


class TaskState(str, Enum):
  SUBMITTED = "submitted"
  WORKING = "working"
  INPUT_REQUIRED = "input-required"
  COMPLETED = "completed"
  CANCELED = "canceled"
  FAILED = "failed"
  UNKNOWN = "unknown"