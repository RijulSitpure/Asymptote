class Solution:
    def maxUniqueSplit(self, s: str) -> int:
        def backtrack(idx: int, seen: set) -> int:
            if idx == len(s):
                return 0
            best = -1
            for end in range(idx + 1, len(s) + 1):
                sub = s[idx:end]
                if sub not in seen:
                    seen.add(sub)
                    res = backtrack(end, seen)
                    if res != -1:
                        best = max(best, 1 + res)
                    seen.remove(sub)
            return best
        return backtrack(0, set())

def test():
    sol = Solution()
    assert sol.maxUniqueSplit("ababccc") == 5
    assert sol.maxUniqueSplit("aba") == 2
    assert sol.maxUniqueSplit("aa") == 1

    print("✓ split-a-string-into-the-max-number-of-unique-substrings passed")

if __name__ == '__main__':
    test()
