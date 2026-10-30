class Solution:
    def minimizeTheDifference(self, mat: list[list[int]], target: int) -> int:
        possible_sums = {0}
        for row in mat:
            next_sums = set()
            min_exceeding = float("inf")
            for s in possible_sums:
                for x in row:
                    val = s + x
                    if val >= target:
                        if val < min_exceeding:
                            min_exceeding = val
                    else:
                        next_sums.add(val)
            if min_exceeding != float("inf"):
                next_sums.add(min_exceeding)
            possible_sums = next_sums
        return min(abs(s - target) for s in possible_sums)
