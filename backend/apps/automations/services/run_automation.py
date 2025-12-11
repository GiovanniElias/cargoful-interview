from datetime import timedelta
from django.utils import timezone
from apps.automations.models import Automation, Run
from random import randint

def run_automation(automation_id=None):
    automations = Automation.objects.filter(status=True)
    
    if automation_id:
        automation = automations.filter(id=automation_id)
        if not automation.exists():
            raise ValueError(f"Automation with ID {automation_id} does not exist.")      
        automations = automation

    for automation in automations:
        if automation.next_run <= timezone.now():
            return Run.objects.create(automation=automation, status=randint(0, 1), timestamp=timezone.now())
    