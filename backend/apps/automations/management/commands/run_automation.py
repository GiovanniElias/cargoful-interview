from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Describe what your command does"

    def add_arguments(self, parser):
        parser.add_argument("--automation_id", type=str, default=None, help="ID of the automation to run")
    
    def handle(self, *args, **options):
        if options["automation_id"]:
            print(f"Running automation with ID: {options['automation_id']}")
            return
        print("Command executed!")
