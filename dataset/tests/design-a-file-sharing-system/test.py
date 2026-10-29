import heapq

class FileSharing:
    def __init__(self, m: int):
        self.free_ids = []
        self.next_id = 1
        self.user_chunks = {}
        self.chunk_users = {}

    def join(self, ownedChunks: list[int]) -> int:
        uid = heapq.heappop(self.free_ids) if self.free_ids else self.next_id
        if uid == self.next_id: self.next_id += 1
        self.user_chunks[uid] = set(ownedChunks)
        for chunk in ownedChunks:
            if chunk not in self.chunk_users:
                self.chunk_users[chunk] = set()
            self.chunk_users[chunk].add(uid)
        return uid

    def leave(self, userID: int) -> None:
        if userID in self.user_chunks:
            for chunk in self.user_chunks[userID]:
                self.chunk_users[chunk].discard(userID)
            del self.user_chunks[userID]
            heapq.heappush(self.free_ids, userID)

    def request(self, userID: int, chunkID: int) -> list[int]:
        users = sorted(list(self.chunk_users.get(chunkID, set())))
        if users and userID in self.user_chunks:
            self.user_chunks[userID].add(chunkID)
            if chunkID not in self.chunk_users:
                self.chunk_users[chunkID] = set()
            self.chunk_users[chunkID].add(userID)
        return users

fs = FileSharing(4)
u1 = fs.join([1, 2])
assert u1 == 1
u2 = fs.join([2, 3])
assert u2 == 2
u3 = fs.join([4])
assert u3 == 3
assert fs.request(1, 3) == [2]
assert fs.request(2, 2) == [1, 2]
fs.leave(1)
assert fs.request(2, 1) == []
fs.leave(2)
assert fs.join([]) == 1
print("All tests passed successfully.")
