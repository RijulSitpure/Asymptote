class Solution:
    def minimumEffort(self, tasks: list[list[int]]) -> int:
        tasks.sort(key=lambda t: t[1] - t[0], reverse=True)
        curr = 0
        initial = 0
        for actual, minimum in tasks:
            if curr < minimum:
                initial += minimum - curr
                curr = minimum
            curr -= actual
        return initial

def test():
    sol = Solution()
    assert sol.minimumEffort([[1,2],[2,4],[4,8]]) == 8
    assert sol.minimumEffort([[1,3],[2,4],[10,11],[10,12],[8,9]]) == 32
    assert sol.minimumEffort([[1,7],[2,8],[3,9],[4,10],[5,11],[6,12]]) == 27

    print("✓ minimum-initial-energy-to-finish-tasks passed")

if __name__ == '__main__':
    test()
