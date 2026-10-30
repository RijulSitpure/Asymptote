import heapq

class Solution:
    def findCrossingTime(self, n: int, k: int, time: list[list[int]]) -> int:
        left_wait = []
        right_wait = []
        left_work = []
        right_work = []
        
        for i in range(k):
            p = time[i][0] + time[i][2]
            heapq.heappush(left_wait, (-p, -i))
            
        cur_time = 0
        rem_boxes = n
        
        while rem_boxes > 0 or right_wait or right_work:
            while left_work and left_work[0][0] <= cur_time:
                t, neg_p, neg_i = heapq.heappop(left_work)
                heapq.heappush(left_wait, (neg_p, neg_i))
                
            while right_work and right_work[0][0] <= cur_time:
                t, neg_p, neg_i = heapq.heappop(right_work)
                heapq.heappush(right_wait, (neg_p, neg_i))
                
            if right_wait:
                neg_p, neg_i = heapq.heappop(right_wait)
                i = -neg_i
                cur_time += time[i][2]
                heapq.heappush(left_work, (cur_time + time[i][3], neg_p, neg_i))
            elif rem_boxes > 0 and left_wait:
                neg_p, neg_i = heapq.heappop(left_wait)
                i = -neg_i
                cur_time += time[i][0]
                rem_boxes -= 1
                heapq.heappush(right_work, (cur_time + time[i][1], neg_p, neg_i))
            else:
                next_t = float('inf')
                if left_work: next_t = min(next_t, left_work[0][0])
                if right_work: next_t = min(next_t, right_work[0][0])
                cur_time = next_t
                
        return cur_time
