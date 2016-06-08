from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from accounts.models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account

    def create(self, validated_data):
        return Account.objects.create_user(**validated_data)
