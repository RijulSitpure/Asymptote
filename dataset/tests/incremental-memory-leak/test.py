class Solution:
    def memLeak(self, memory1: int, memory2: int) -> list[int]:
        t = 1
        while memory1 >= t or memory2 >= t:
            if memory1 >= memory2:
                memory1 -= t
            else:
                memory2 -= t
            t += 1
        return [t, memory1, memory2]

def test():
    sol = Solution()
    assert sol.memLeak(2, 2) == [3, 1, 0]
    assert sol.memLeak(8, 11) == [6, 0, 4]

if __name__ == '__main__':
    test()
