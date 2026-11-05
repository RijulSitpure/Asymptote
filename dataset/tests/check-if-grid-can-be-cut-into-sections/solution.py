class Solution:
    def checkValidCuts(self, n: int, rectangles: list[list[int]]) -> bool:
        def canCut(intervals: list[list[int]]) -> bool:
            intervals.sort(key=lambda x: (x[0], x[1]))
            sections = 0
            max_end = intervals[0][1]
            for start, end in intervals[1:]:
                if start >= max_end:
                    sections += 1
                    max_end = end
                else:
                    max_end = max(max_end, end)
            return sections >= 2

        x_intervals = [[r[0], r[2]] for r in rectangles]
        y_intervals = [[r[1], r[3]] for r in rectangles]
        return canCut(x_intervals) or canCut(y_intervals)
