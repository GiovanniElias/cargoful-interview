# automations/serializers.py
from rest_framework import serializers
from .models import Automation, Schedule, Run


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['id', 'frequency', 'start_date']


class AutomationSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    schedule = ScheduleSerializer()
    last_run = serializers.SerializerMethodField()

    class Meta:
        model = Automation
        fields = ['id', 'name', 'status', 'schedule', 'last_run']

    def get_last_run(self, obj):
        if obj.last_run:
            return {
                'timestamp': obj.last_run.timestamp,
                'status': obj.last_run.status
            }
        return None

    def create(self, validated_data):
        schedule_data = validated_data.pop('schedule')
        schedule, _ = Schedule.objects.get_or_create(**schedule_data)
        automation = Automation.objects.create(schedule=schedule, **validated_data)
        return automation
