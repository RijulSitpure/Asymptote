class Solution:
    def countDays(self, days: int, meetings: list[list[int]]) -> int:
        meetings.sort()
        occupied = 0
        cur_s, cur_e = meetings[0]
        for s, e in meetings[1:]:
            if s <= cur_e:
                cur_e = max(cur_e, e)
            else:
                occupied += cur_e - cur_s + 1
                cur_s, cur_e = s, e
        occupied += cur_e - cur_s + 1
        return days - occupied