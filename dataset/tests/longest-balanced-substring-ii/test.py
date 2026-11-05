class Solution:
    def longestBalancedSubstring(self, s: str) -> int:
        # Balanced substring where characters 'a', 'b', 'c' have equal frequency
        # Difference signature: (cnt_b - cnt_a, cnt_c - cnt_a)
        seen = {(0, 0): -1}
        ca = cb = cc = 0
        max_len = 0
        for i, ch in enumerate(s):
            if ch == 'a': ca += 1
            elif ch == 'b': cb += 1
            elif ch == 'c': cc += 1
            key = (cb - ca, cc - ca)
            if key in seen:
                max_len = max(max_len, i - seen[key])
            else:
                seen[key] = i
        return max_len

def run_tests():
    sol = Solution()
    assert sol.longestBalancedSubstring("abcabc") == 6
    assert sol.longestBalancedSubstring("aabcb") == 3
    assert sol.longestBalancedSubstring("aaaa") == 0
    print("All tests passed for 3714.")

if __name__ == "__main__":
    run_tests()