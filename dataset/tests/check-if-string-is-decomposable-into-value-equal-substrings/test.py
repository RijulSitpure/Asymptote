class Solution:
    def isDecomposable(self, s: str) -> bool:
        has_two = False
        i = 0
        n = len(s)
        while i < n:
            j = i
            while j < n and s[j] == s[i]:
                j += 1
            length = j - i
            rem = length % 3
            if rem == 0:
                pass
            elif rem == 2:
                if has_two:
                    return False
                has_two = True
            else:
                return False
            i = j
        return has_two

def test_is_decomposable():
    sol = Solution()
    assert sol.isDecomposable("000111000") == False
    assert sol.isDecomposable("00011111222") == True
    assert sol.isDecomposable("0111000222330") == False

