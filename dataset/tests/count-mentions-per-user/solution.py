class Solution:
    def countMentions(self, numberOfUsers: int, events: list[list[str]]) -> list[int]:
        events.sort(key=lambda x: (int(x[1]), 0 if x[0] == "OFFLINE" else 1))
        mentions = [0] * numberOfUsers
        offline_until = [0] * numberOfUsers
        
        for ev_type, ts_str, data in events:
            curr_time = int(ts_str)
            if ev_type == "OFFLINE":
                user_id = int(data)
                offline_until[user_id] = curr_time + 60
            elif ev_type == "MESSAGE":
                if data == "ALL":
                    for i in range(numberOfUsers):
                        mentions[i] += 1
                elif data == "HERE":
                    for i in range(numberOfUsers):
                        if curr_time >= offline_until[i]:
                            mentions[i] += 1
                else:
                    for token in data.split():
                        user_id = int(token[2:])
                        mentions[user_id] += 1
        return mentions
