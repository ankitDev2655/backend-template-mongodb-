/**
 * Commitlint Configuration
 *
 * Enforces the Conventional Commits specification.
 *
 * Format:
 * <type>(optional-scope): <description>
 *
 * Examples:
 * feat(auth): add JWT authentication
 * fix(user): resolve duplicate email validation
 * docs: update README
 * refactor(logger): simplify logger configuration
 */

export default {
    extends: ["@commitlint/config-conventional"],

    rules: {
        // Subject must not be empty
        "subject-empty": [2, "never"],

        // Type must not be empty
        "type-empty": [2, "never"],

        // Maximum header length
        "header-max-length": [2, "always", 100],

        // Allowed commit types
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "docs",
                "style",
                "refactor",
                "perf",
                "test",
                "build",
                "ci",
                "chore",
                "revert"
            ]
        ],
        "subject-case":[2, "always", "sentence-case"]
    }
};