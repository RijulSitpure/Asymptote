class Solution:
    def countDaysTogether(self, arriveAlice: str, leaveAlice: str, arriveBob: str, leaveBob: str) -> int:
        days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        def to_day(date_str):
            m, d = map(int, date_str.split('-'))
            return sum(days_in_month[:m - 1]) + d
        
        start_a, end_a = to_day(arriveAlice), to_day(leaveAlice)
        start_b, end_b = to_day(arriveBob), to_day(leaveBob)
        
        overlap_start = max(start_a, start_b)
        overlap_end = min(end_a, end_b)
        return max(0, overlap_end - overlap_start + 1)
