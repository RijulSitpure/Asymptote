class Solution:
    def maximumRemovals(self, s: str, p: str, removable: list[int]) -> int:
        def check(k: int) -> bool:
            removed = set(removable[:k])
            j = 0
            for i, ch in enumerate(s):
                if i in removed:
                    continue
                if ch == p[j]:
                    j += 1
                    if j == len(p):
                        return True
            return False

        low, high = 0, len(removable)
        ans = 0
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans

def test():
    sol = Solution()
    assert sol.maximumRemovals("abcacb", "ab", [3,1,0]) == 2
    assert sol.maximumRemovals("abcbddddd", "abcd", [3,2,1,4,5,6]) == 1

if __name__ == '__main__':
    test()
