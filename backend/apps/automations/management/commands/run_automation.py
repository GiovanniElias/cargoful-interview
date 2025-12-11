from django.core.management.base import BaseCommand
from apps.automations.services.run_automation import run_automation
class Command(BaseCommand):
    help = "Describe what your command does"

    def add_arguments(self, parser):
        parser.add_argument("--automation_id", type=str, default=None, help="ID of the automation to run")
    
    def handle(self, *args, **options):
        if options["automation_id"]:
            run_automation(options["automation_id"])
        
        run_automation()
