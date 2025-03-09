## Setup

### Mac

1. Unzip `setup` into the folder you want to hold this project.
2. Copy the folder. Open `Terminal` by pressing `command + space`, typing `Terminal` and pressing `Enter`.
3. Open the folder by typing `cd "paste the folder"`.
4. Paste this command into `Terminal`.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

5. Make sure to copy and run the three lines that it tells you to after installation.
6. Paste the next line into terminal and run. It runs setup, installs git, then clones repo.

```bash
chmod +x setup.sh && ./setup.sh
```

4. Paste and run. Opens the folder, installs dependencies, starts Expo.

```bash
cd heads-up-app && npm install && npx expo start
```

### Testing On Your Phone

1. Install Expo Go from the app store.
2. Run `npx expo start` in terminal in the project folder.
2. If the text menu says `Press s │ switch to Expo Go`, then press s to switch.
3. Open your phone's camera and scan the QR code. It should prompt you to open Expo Go.

## Building

- https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&platform=ios&device=physical
- https://www.reddit.com/r/reactnative/comments/1981n5q/how_to_run_expo_app_on_a_physical_device_without/
- https://docs.expo.dev/more/expo-cli/#compiling

### Setup

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure your project**
   ```bash
   eas build:configure
   ```

3. **Build a custom development client**
   ```bash
   eas build -p ios --profile development
   ```

4. **Install it on your iPhone**  
   Use Apple's free developer account and Xcode to install the custom build.

## Resources

### Words

Codenames: [this repo](https://github.com/jacksun007/codenames)

## Style - by [joell](http://johwells.com)

### Fonts

Using Montserrat; weight
If we make money, then Deuterium; weight

### Colors
