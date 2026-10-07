# Contributing Guidelines

Thank you for contributing to the **Demo Teaching Interactive Presentation** project!

To maintain code quality and a clean history, please adhere to the following guidelines:

## 1. Branching Strategy
* Always branch off the `main` branch.
* Use descriptive branch names:
  * `feat/feature-name` for new features or interactive modules
  * `fix/bug-fix-name` for bug fixes or slide adjustments
  * `docs/documentation-update` for documentation changes

## 2. Commit Message Conventions
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
* `feat:` A new feature or interactive element
* `fix:` A bug fix in script execution or slide transitions
* `docs:` Documentation or teacher guide updates
* `style:` Formatting, visual styling, or CSS tweaks
* `refactor:` Code restructuring without changing behavior
* `chore:` Repository maintenance, configuration, or asset updates

## 3. Pull Requests
* Open a Pull Request (PR) targeting the `main` branch before merging.
* Provide a clear description of the changes and link any related issues.
* Ensure all changes have been tested across screen resolutions (projector friendly: 1920x1080 / 1366x768).

## 4. Testing & Verification
* Write and verify tests or perform manual test runs before merging:
  * Ensure all 10 slides render properly and keyboard navigation functions seamlessly.
  * Verify interactive components (Flip the Circle game, In-browser Python IDE, Formative Quiz).
  * Confirm that syntax check (`node --check js/app.js`) passes without errors.
