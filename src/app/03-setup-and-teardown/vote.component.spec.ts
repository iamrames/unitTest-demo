import { VoteComponent } from './vote.component';

// Arrange Act and Assert
// Arrange
let component: VoteComponent;

beforeEach(() => {
  component = new VoteComponent();
});

describe('VoteComponent', () => {
  it('should increment total vote when upVoted', () => {
      // Arrange Act and Assert
      // Act
      component.upVote();
      // Assert
      expect(component.totalVotes).toBe(1);
  });

  it('should decrement total vote when downVoted', () => {
    // Act
    component.downVote();
    // Assert
    expect(component.totalVotes).toBe(-1);
});
});
