from typing import List

class Solution:
    def partitionString(self, s: str) -> List[str]:
        seen = set()
        ans = []
        i = 0
        n = len(s)
        while i < n:
            curr = ""
            j = i
            while j < n:
                curr += s[j]
                if curr not in seen:
                    break
                j += 1
            seen.add(curr)
            ans.append(curr)
            i = j + 1
        return ans

def run_tests():
    s = Solution()
    res1 = s.partitionString("abbcccc")
    assert res1 == ["a", "b", "bc", "c", "cc"], f"Expected ['a', 'b', 'bc', 'c', 'cc'], got {res1}"
    res2 = s.partitionString("abc")
    assert res2 == ["a", "b", "c"], f"Expected ['a', 'b', 'c'], got {res2}"
    print("3597 partition-string PASSED")

if __name__ == "__main__":
    run_tests()
