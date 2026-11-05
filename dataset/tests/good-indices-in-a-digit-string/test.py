class Solution:
    def goodIndices(self, s: str, k: int, m: int) -> list[int]:
        n = len(s)
        if n < k:
            return []
        
        res = []
        cur = 0
        for i in range(k):
            cur = (cur * 10 + int(s[i])) % m
        if cur == 0:
            res.append(0)
        
        power = pow(10, k - 1, m)
        for i in range(1, n - k + 1):
            cur = (cur - int(s[i - 1]) * power) % m
            cur = (cur * 10 + int(s[i + k - 1])) % m
            if cur == 0:
                res.append(i)
        return res

def run_tests():
    sol = Solution()
    # s="1204", k=2, m=3: "12" % 3 == 0 (idx 0), "20" % 3 == 2, "04" % 3 == 1 -> [0]
    assert sol.goodIndices("1204", 2, 3) == [0]
    assert sol.goodIndices("123", 1, 2) == [1] # '2' is at idx 1
    print("All tests passed for 3817.")

if __name__ == "__main__":
    run_tests()
