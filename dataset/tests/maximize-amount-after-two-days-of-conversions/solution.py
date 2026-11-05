from collections import defaultdict, deque

class Solution:
    def maxAmount(self, initialCurrency: str, pairs1: list[list[str]], rates1: list[float], pairs2: list[list[str]], rates2: list[float]) -> float:
        def get_max_holdings(start_curr, base_amount, pairs, rates):
            graph = defaultdict(list)
            for (u, v), r in zip(pairs, rates):
                graph[u].append((v, r))
                graph[v].append((u, 1.0 / r))
                
            best = {start_curr: base_amount}
            q = deque([(start_curr, base_amount)])
            while q:
                curr, amt = q.popleft()
                for nxt, r in graph[curr]:
                    new_amt = amt * r
                    if new_amt > best.get(nxt, 0.0) * 1.0000001:
                        best[nxt] = new_amt
                        q.append((nxt, new_amt))
            return best
            
        day1_holdings = get_max_holdings(initialCurrency, 1.0, pairs1, rates1)
        ans = 1.0
        for curr, amt in day1_holdings.items():
            day2_holdings = get_max_holdings(curr, amt, pairs2, rates2)
            if initialCurrency in day2_holdings:
                if day2_holdings[initialCurrency] > ans:
                    ans = day2_holdings[initialCurrency]
        return ans
