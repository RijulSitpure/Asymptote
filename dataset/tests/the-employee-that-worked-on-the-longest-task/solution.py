class Solution:
    def hardestWorker(self, n: int, logs: list[list[int]]) -> int:
        best_id = logs[0][0]
        max_dur = logs[0][1]
        prev_time = logs[0][1]
        
        for emp_id, leave_time in logs[1:]:
            dur = leave_time - prev_time
            if dur > max_dur or (dur == max_dur and emp_id < best_id):
                max_dur = dur
                best_id = emp_id
            prev_time = leave_time
        return best_id
