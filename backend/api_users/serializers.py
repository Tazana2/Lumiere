from . import models
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ["id", "username", "email", "password", "bio", "created_at"]
        extra_kwargs = {
            "password": {"write_only": True}, 
            "bio": {"required": False}, 
            "created_at": {"read_only": True}
        }

    def create(self, validated_data):
        print(validated_data)
        user = models.CustomUser.objects.create_user(**validated_data)
        return user