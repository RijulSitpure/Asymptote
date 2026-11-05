from collections import defaultdict

class AuctionSystem:
    def __init__(self):
        self.item_bids = defaultdict(dict)
    
    def placeBid(self, item_id: int, user_id: int, amount: int) -> None:
        self.item_bids[item_id][user_id] = amount
    
    def getHighestBid(self, item_id: int) -> int:
        bids = self.item_bids.get(item_id)
        if not bids:
            return 0
        return max(bids.values())
    
    def withdrawBid(self, item_id: int, user_id: int) -> None:
        if item_id in self.item_bids and user_id in self.item_bids[item_id]:
            del self.item_bids[item_id][user_id]

def run_tests():
    sys = AuctionSystem()
    assert sys.getHighestBid(1) == 0
    sys.placeBid(1, 10, 100)
    sys.placeBid(1, 11, 150)
    assert sys.getHighestBid(1) == 150
    sys.withdrawBid(1, 11)
    assert sys.getHighestBid(1) == 100
    print("All tests passed for 3815.")

if __name__ == "__main__":
    run_tests()
