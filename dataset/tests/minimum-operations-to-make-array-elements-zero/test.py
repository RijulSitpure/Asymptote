class Solution:
    def minOperations(self, queries: list[list[int]]) -> int:
        ans = 0
        for l, r in queries:
            op = 0
            i = 0
            mn = l
            t = 1

            while t <= r:
                if t > mn:
                    if t <= r:
                        op += (t - mn) * i
                    else:
                        op += (r - mn + 1) * i
                    mn = t
                i += 1
                t = 1 << (i << 1)

            if mn <= r:
                op += (r - mn + 1) * i

            ans += (op + 1) // 2

        return ans

def run_tests():
    s = Solution()
    assert s.minOperations([[1, 2]]) == 1
    assert s.minOperations([[2, 4]]) == 2
    print("All tests passed for minimum-operations-to-make-array-elements-zero")

if __name__ == '__main__':
    run_tests()
