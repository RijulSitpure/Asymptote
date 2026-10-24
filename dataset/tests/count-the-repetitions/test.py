class Solution:
    def getMaxRepetitions(self, s1: str, n1: int, s2: str, n2: int) -> int:
        s1_count = 0
        s2_count = 0
        idx = 0
        recall = {}

        while s1_count < n1:
            s1_count += 1
            for ch in s1:
                if ch == s2[idx]:
                    idx += 1
                    if idx == len(s2):
                        s2_count += 1
                        idx = 0

            if idx in recall:
                prev_s1, prev_s2 = recall[idx]
                period_s1 = s1_count - prev_s1
                period_s2 = s2_count - prev_s2
                cycles = (n1 - s1_count) // period_s1
                s1_count += cycles * period_s1
                s2_count += cycles * period_s2
            else:
                recall[idx] = (s1_count, s2_count)

        return s2_count // n2

def test():
    sol = Solution()
    assert sol.getMaxRepetitions("acb", 4, "ab", 2) == 2, "test 1 failed"
    assert sol.getMaxRepetitions("acb", 1, "acb", 1) == 1, "test 2 failed"
    print("✓ count-the-repetitions passed")

if __name__ == "__main__":
    test()
