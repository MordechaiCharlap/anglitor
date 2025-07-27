"use client";

import {
  Screen,
  Container,
  Card,
  Text,
  Button,
  ThemeToggle,
} from "@/components";
import { useState } from "react";

export default function SettingsPage() {
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);

  return (
    <Screen>
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2">
            ⚙️ Settings
          </Text>
          <Text variant="body" color="secondary">
            Customize your learning experience
          </Text>
        </div>

        {/* Theme Settings */}
        <Card className="mb-6">
          <div className="p-6">
            <Text variant="h3" className="mb-4">
              🎨 Appearance
            </Text>
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body" className="mb-1">
                  Theme
                </Text>
                <Text variant="caption" color="muted">
                  Choose between light and dark mode
                </Text>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="mb-6">
          <div className="p-6">
            <Text variant="h3" className="mb-4">
              🔒 Privacy
            </Text>
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body" className="mb-1">
                  Private Profile
                </Text>
                <Text variant="caption" color="muted">
                  Make your profile visible only to you
                </Text>
              </div>
              <Button
                variant={isPrivateProfile ? "primary" : "secondary"}
                onClick={() => setIsPrivateProfile(!isPrivateProfile)}
                className="min-w-20"
              >
                {isPrivateProfile ? "Private" : "Public"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="mb-6">
          <div className="p-6">
            <Text variant="h3" className="mb-4">
              👤 Account
            </Text>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="body" className="mb-1">
                    Edit Profile
                  </Text>
                  <Text variant="caption" color="muted">
                    Change your name and profile picture
                  </Text>
                </div>
                <Button variant="secondary">
                  Edit
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="body" className="mb-1">
                    Change Password
                  </Text>
                  <Text variant="caption" color="muted">
                    Update your account password
                  </Text>
                </div>
                <Button variant="secondary">
                  Change
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Settings */}
        <Card>
          <div className="p-6">
            <Text variant="h3" className="mb-4">
              📚 Learning
            </Text>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="body" className="mb-1">
                    Daily Goal
                  </Text>
                  <Text variant="caption" color="muted">
                    Set your daily learning target
                  </Text>
                </div>
                <Button variant="secondary">
                  10 min
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="body" className="mb-1">
                    Notifications
                  </Text>
                  <Text variant="caption" color="muted">
                    Remind me to practice
                  </Text>
                </div>
                <Button variant="secondary">
                  On
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </Screen>
  );
}