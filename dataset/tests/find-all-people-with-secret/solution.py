from collections import defaultdict, deque

class Solution:
    def findAllPeople(self, n: int, meetings: list[list[int]], firstPerson: int) -> list[int]:
        known = {0, firstPerson}
        meetings.sort(key=lambda m: m[2])

        i = 0
        m_len = len(meetings)

        while i < m_len:
            t = meetings[i][2]
            adj = defaultdict(list)
            participants = set()

            while i < m_len and meetings[i][2] == t:
                u, v, _ = meetings[i]
                adj[u].append(v)
                adj[v].append(u)
                participants.add(u)
                participants.add(v)
                i += 1

            queue = deque([p for p in participants if p in known])
            visited = set(queue)

            while queue:
                curr = queue.popleft()
                for neighbor in adj[curr]:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        known.add(neighbor)
                        queue.append(neighbor)

        return sorted(known)
