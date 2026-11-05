class Solution:
    def reverseDegree(self, s: str) -> int:
        ans = 0
        for i, ch in enumerate(s):
            rev_val = ord('z') - ord(ch) + 1
            ans += (i + 1) * rev_val
        return ans

def run_tests():
    s = Solution()
    # "a": pos 1, rev_val 26 -> 26
    assert s.reverseDegree("a") == 26
    # "z": pos 1, rev_val 1 -> 1
    assert s.reverseDegree("z") == 1
    # "az": pos 1: 26, pos 2: 1*2 = 2 -> 28
    assert s.reverseDegree("az") == 28
    print("All tests passed for reverse-degree-of-a-string")

if __name__ == '__main__':
    run_tests()
