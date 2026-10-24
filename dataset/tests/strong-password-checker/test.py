class Solution:
    def strongPasswordChecker(self, password: str) -> int:
        n = len(password)
        has_lower = any(c.islower() for c in password)
        has_upper = any(c.isupper() for c in password)
        has_digit = any(c.isdigit() for c in password)
        missing = (0 if has_lower else 1) + (0 if has_upper else 1) + (0 if has_digit else 1)

        replace = 0
        one_del = 0
        two_del = 0

        i = 2
        while i < n:
            if password[i] == password[i - 1] == password[i - 2]:
                length = 2
                while i < n and password[i] == password[i - 1]:
                    length += 1
                    i += 1
                replace += length // 3
                if length % 3 == 0:
                    one_del += 1
                elif length % 3 == 1:
                    two_del += 1
            else:
                i += 1

        if n < 6:
            return max(6 - n, missing)
        elif n <= 20:
            return max(replace, missing)
        else:
            to_delete = n - 20
            replace -= min(to_delete, one_del)
            replace -= min(max(to_delete - one_del, 0) // 2, two_del)
            replace -= max(to_delete - one_del - 2 * two_del, 0) // 3
            return to_delete + max(replace, missing)

def test():
    sol = Solution()
    assert sol.strongPasswordChecker("a") == 5, "test 1 failed"
    assert sol.strongPasswordChecker("aA1") == 3, "test 2 failed"
    assert sol.strongPasswordChecker("1337C0d3") == 0, "test 3 failed"
    print("✓ strong-password-checker passed")

if __name__ == "__main__":
    test()
