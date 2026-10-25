class Solution:
    def constructDistancedSequence(self, n: int) -> list[int]:
        size = 2 * n - 1
        res = [0] * size
        used = [False] * (n + 1)

        def backtrack(idx: int) -> bool:
            while idx < size and res[idx] != 0:
                idx += 1
            if idx == size:
                return True
            for num in range(n, 0, -1):
                if used[num]:
                    continue
                if num == 1:
                    res[idx] = 1
                    used[1] = True
                    if backtrack(idx + 1):
                        return True
                    res[idx] = 0
                    used[1] = False
                else:
                    if idx + num < size and res[idx + num] == 0:
                        res[idx] = num
                        res[idx + num] = num
                        used[num] = True
                        if backtrack(idx + 1):
                            return True
                        res[idx] = 0
                        res[idx + num] = 0
                        used[num] = False
            return False

        backtrack(0)
        return res

def test():
    sol = Solution()
    assert sol.constructDistancedSequence(3) == [3,1,2,3,2]
    assert sol.constructDistancedSequence(5) == [5,3,1,4,3,5,2,4,2]

    print("✓ construct-the-lexicographically-largest-valid-sequence passed")

if __name__ == '__main__':
    test()
