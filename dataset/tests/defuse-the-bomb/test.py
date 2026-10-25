class Solution:
    def decrypt(self, code: list[int], k: int) -> list[int]:
        n = len(code)
        res = [0] * n
        if k == 0:
            return res
        start, end = (1, k) if k > 0 else (n + k, n - 1)
        w_sum = sum(code[i % n] for i in range(start, end + 1))
        for i in range(n):
            res[i] = w_sum
            w_sum -= code[start % n]
            start += 1
            end += 1
            w_sum += code[end % n]
        return res

def test():
    sol = Solution()
    assert sol.decrypt([5,7,1,4], 3) == [12,10,16,13]
    assert sol.decrypt([1,2,3,4], 0) == [0,0,0,0]
    assert sol.decrypt([2,4,9,3], -2) == [12,5,6,13]

    print("✓ defuse-the-bomb passed")

if __name__ == '__main__':
    test()
