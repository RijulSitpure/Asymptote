import bisect

class Solution:
    def minWastedSpace(self, packages: list[int], boxes: list[list[int]]) -> int:
        packages.sort()
        n = len(packages)
        pkg_sum = sum(packages)
        INF = float('inf')
        min_total_box = INF

        for supplier in boxes:
            supplier.sort()
            if supplier[-1] < packages[-1]:
                continue
            curr_box_sum = 0
            prev_idx = 0
            for b in supplier:
                idx = bisect.bisect_right(packages, b)
                count = idx - prev_idx
                curr_box_sum += count * b
                prev_idx = idx
                if idx == n:
                    break
            min_total_box = min(min_total_box, curr_box_sum)

        return (min_total_box - pkg_sum) % (10**9 + 7) if min_total_box != INF else -1

def test():
    sol = Solution()
    assert sol.minWastedSpace([2,3,5], [[4,8],[2,8]]) == 6
    assert sol.minWastedSpace([2,3,5], [[1,4],[2,3],[3,4]]) == -1
    assert sol.minWastedSpace([3,5,8,10,11,12], [[12],[11,9],[10,5,14]]) == 9

if __name__ == '__main__':
    test()
