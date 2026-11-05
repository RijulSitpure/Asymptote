from typing import List

class Solution:
    def countReplacements(self, students: List[int]) -> int:
        # A student is replaced if a student behind them has a strictly higher priority/score
        # Simulates until stable: total replacements
        running_max = -float('inf')
        replacements = 0
        for x in reversed(students):
            if x < running_max:
                replacements += 1
            else:
                running_max = x
        return replacements

def run_tests():
    s = Solution()
    res1 = s.countReplacements([3, 1, 4, 2]) # 3 < 4 (replaced), 1 < 4 (replaced), 2 < 2 (not replaced) -> 2
    assert res1 == 2, f"Expected 2, got {res1}"
    res2 = s.countReplacements([5, 4, 3, 2, 1])
    assert res2 == 0, f"Expected 0, got {res2}"
    print("3616 number-of-student-replacements PASSED")

if __name__ == "__main__":
    run_tests()
