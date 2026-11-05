class Solution:
    def findXSum(self, nums: list[int], k: int, x: int) -> list[int]:
        from collections import Counter
        import heapq
        
        n = len(nums)
        counts = Counter()
        
        # Two heaps with lazy deletion
        # top: min-heap of (freq, val) of size up to x
        # bot: max-heap of (-freq, -val) of all remaining elements
        top = []
        bot = []
        in_top = set()
        
        top_sum = 0
        
        def prune_top():
            while top and (counts[top[0][1]] != top[0][0] or top[0][1] not in in_top):
                heapq.heappop(top)
                
        def prune_bot():
            while bot and (counts[-bot[0][1]] != -bot[0][0] or -bot[0][1] in in_top):
                heapq.heappop(bot)
                
        def balance():
            nonlocal top_sum
            prune_top()
            prune_bot()
            # If top has space and bot has elements, promote
            while len(in_top) < x and bot:
                neg_f, neg_v = heapq.heappop(bot)
                f, v = -neg_f, -neg_v
                if counts[v] == f and v not in in_top:
                    in_top.add(v)
                    top_sum += f * v
                    heapq.heappush(top, (f, v))
                prune_bot()
                
            # If top smallest is strictly smaller than bot largest, swap
            prune_top()
            prune_bot()
            while top and bot:
                tf, tv = top[0]
                bf, bv = -bot[0][0], -bot[0][1]
                if (bf, bv) > (tf, tv):
                    heapq.heappop(top)
                    heapq.heappop(bot)
                    in_top.remove(tv)
                    top_sum -= tf * tv
                    in_top.add(bv)
                    top_sum += bf * bv
                    heapq.heappush(top, (bf, bv))
                    heapq.heappush(bot, (-tf, -tv))
                    prune_top()
                    prune_bot()
                else:
                    break
                    
        def add(v):
            nonlocal top_sum
            if v in in_top:
                in_top.remove(v)
                top_sum -= counts[v] * v
            counts[v] += 1
            # Push into bot, then balance promotes if appropriate
            heapq.heappush(bot, (-counts[v], -v))
            balance()
            
        def remove(v):
            nonlocal top_sum
            if v in in_top:
                in_top.remove(v)
                top_sum -= counts[v] * v
            counts[v] -= 1
            if counts[v] > 0:
                heapq.heappush(bot, (-counts[v], -v))
            balance()
            
        ans = []
        for i in range(k):
            add(nums[i])
        ans.append(top_sum)
        
        for i in range(k, n):
            add(nums[i])
            remove(nums[i - k])
            ans.append(top_sum)
            
        return ans
