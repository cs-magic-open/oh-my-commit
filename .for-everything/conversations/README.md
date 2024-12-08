# Conversation Logs

This directory contains conversation logs in JSON format.

## Structure

- Each conversation is stored in its own directory: `YYYY-MM-DD_conversation_id/`
- The main conversation data is in `conversation.json`
- Additional files (if any) are stored alongside the JSON file

## Format

```json
{
  "conversation": {
    "id": "<timestamp>_<first_4_chars_of_first_message>",
    "status": {
      "state": "completed|paused|ongoing",
      "satisfaction": "high|medium|low"
    },
    "rounds": [
      {
        "sequence": "number",
        "user_input": "text",
        "assistant_response": "text",
        "timestamp": "ISO_8601"
      }
    ]
  }
}
```

## Closing Signals

| Signal | Type | Commit Format | Response |
|--------|------|---------------|-----------|
| aaa | feat | ✨ feat(conv_id): implement complete {topic} | ✨ 很高兴帮上忙。已提交更改，再见！ |
| aa | chore | chore(conv_id): complete implementation of {topic} | 好的，已完成并提交。再见！ |
| a | fix | fix(conv_id): address basic requirements for {topic} | 已完成并提交。如需改进请告诉我。 |
| n | wip | wip(conv_id): progress on {topic} | 好的，请说下一个需求。 |
| w | chore | chore(conv_id): pause development of {topic} | 已保存进度，随时继续。 |
