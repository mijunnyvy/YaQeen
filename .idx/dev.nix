# YaQeen_v1 development environment on Firebase Studio (IDX)
# Runs Firebase Emulator (Firestore + Auth) and Expo together

{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.nodejs_20
    pkgs.androidsdk-cmdline-tools # Includes essential tools like sdkmanager
    pkgs.androidsdk.platform-tools # Includes adb
    pkgs.androidsdk.build-tools.latest # Required for building Android apps
    pkgs.androidsdk.platforms.android-34 # Or the target Android API level for your project
    pkgs.nodePackages.firebase-tools
    pkgs.nodePackages.npm
  ];

  env = {
    # Set ANDROID_HOME to the location of the Android SDK provided by Nix
    ANDROID_HOME = "${pkgs.androidsdk}";
    # Fix watch mode for Expo inside IDX
    CI = "false";
  };

  idx = {
    extensions = [
      "ms-vscode.vscode-typescript-next"
    ];

    previews = {
      enable = true;
      previews = {
        web = {
          # Run Expo inside IDX
          command = ["npx" "expo" "start" "--tunnel"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    workspace = {
      onCreate = {
        npm-install = "npm install";
      };

      onStart = {
        # Start Firebase Emulator in background (Firestore + Auth)
        start-emulator = "firebase emulators:start --only firestore,auth --project yaqeen_v1 &";

        # Start Expo after emulator is running
        start-expo = "npx expo start --tunnel";
      };
    };
  };
}
