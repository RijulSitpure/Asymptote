class Solution:
    def canMakePaliQueries(self, s: str, queries: list[list[int]]) -> list[bool]:
        n = len(s)
        prefix = [0] * (n + 1)
        for i, c in enumerate(s):
            prefix[i + 1] = prefix[i] ^ (1 << (ord(c) - ord('a')))
        
        res = []
        for left, right, k in queries:
            mask = prefix[right + 1] ^ prefix[left]
            odd_cnt = bin(mask).count('1')
            res.append(odd_cnt // 2 <= k)
        return res

def test():
    sol = Solution()
    s1 = "abcda"; q1 = [[3,3,0],[1,2,0],[0,3,1],[0,3,2],[0,4,1]]
    assert sol.canMakePaliQueries(s1, q1) == [True,False,False,True,True], "test 1 failed"
    s2 = "lyb"; q2 = [[0,1,0],[2,2,1]]
    assert sol.canMakePaliQueries(s2, q2) == [False, True], "test 2 failed"
    print("✓ can-make-palindrome-from-substring passed")

if __name__ == "__main__":
    test()
