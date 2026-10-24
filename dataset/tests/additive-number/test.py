import sys

class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        n = len(num)
        for i in range(1, n):
            if num[0] == "0" and i > 1:
                break
            n1 = int(num[:i])
            for j in range(i + 1, n):
                if num[i] == "0" and j - i > 1:
                    break
                n2 = int(num[i:j])
                k = j
                a, b = n1, n2
                while k < n:
                    c = a + b
                    c_str = str(c)
                    if not num.startswith(c_str, k):
                        break
                    k += len(c_str)
                    a, b = b, c
                if k == n:
                    return True
        return False

def test():
    sol = Solution()
    assert sol.isAdditiveNumber("112358") is True, "test 1 failed"
    assert sol.isAdditiveNumber("199100199") is True, "test 2 failed"
    assert sol.isAdditiveNumber("1023") is False, "test 3 failed"
    print("✓ additive-number passed")

if __name__ == "__main__":
    test()
