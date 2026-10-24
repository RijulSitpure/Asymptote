from typing import List

class Solution:
    def splitIntoFibonacci(self, num: str) -> List[int]:
        MAX_VAL = 2**31 - 1
        n = len(num)
        for i in range(1, min(11, n)):
            s1 = num[:i]
            if len(s1) > 1 and s1[0] == '0':
                break
            n1 = int(s1)
            if n1 > MAX_VAL:
                break
            for j in range(i + 1, min(i + 11, n)):
                s2 = num[i:j]
                if len(s2) > 1 and s2[0] == '0':
                    break
                n2 = int(s2)
                if n2 > MAX_VAL:
                    break
                res = [n1, n2]
                k = j
                while k < n:
                    nxt = res[-1] + res[-2]
                    if nxt > MAX_VAL:
                        break
                    s_nxt = str(nxt)
                    if not num.startswith(s_nxt, k):
                        break
                    res.append(nxt)
                    k += len(s_nxt)
                if k == n and len(res) >= 3:
                    return res
        return []

def test():
    sol = Solution()
    assert sol.splitIntoFibonacci("1101111") == [11, 0, 11, 11], "test 1 failed"
    assert sol.splitIntoFibonacci("112358130") == [], "test 2 failed"
    assert sol.splitIntoFibonacci("0123") == [], "test 3 failed"
    print("✓ split-array-into-fibonacci-sequence passed")

if __name__ == "__main__":
    test()
