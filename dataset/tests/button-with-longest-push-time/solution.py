class Solution:
    def buttonWithLongestTime(self, events: list[list[int]]) -> int:
        best_time = events[0][1]
        best_idx = events[0][0]
        
        for i in range(1, len(events)):
            idx, t = events[i]
            duration = t - events[i - 1][1]
            if duration > best_time or (duration == best_time and idx < best_idx):
                best_time = duration
                best_idx = idx
                
        return best_idx
