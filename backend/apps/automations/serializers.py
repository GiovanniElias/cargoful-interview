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
    class Meta:
        model = Automation
        fields = ['id', 'name', 'status', 'schedule']

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
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.status = validated_data.get('status', instance.status)

        schedule_data = validated_data.get('schedule')
        
        if schedule_data:
            schedule = instance.schedule
            schedule.frequency = schedule_data.get('frequency', schedule.frequency)
            schedule.start_date = schedule_data.get('start_date', schedule.start_date)
            schedule.save()

        instance.save()
        return instance
