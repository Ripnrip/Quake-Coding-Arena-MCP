<Card size="sm">
  <Col>
    <Text
      value="🎮 Quake Coding Arena"
      size="md"
      weight="semibold"
      color="emphasis"
    />
    <Text
      value="Select an achievement to play"
      size="sm"
      color="secondary"
    />
  </Col>

  <Divider flush />

  <Col>
    <Select
      key="achievement"
      placeholder="Choose an achievement..."
      options={[
        { label: "FIRST BLOOD", value: "FIRST BLOOD" },
        { label: "HEADSHOT", value: "HEADSHOT" },
        { label: "DOUBLE KILL", value: "DOUBLE KILL" },
        { label: "TRIPLE KILL", value: "TRIPLE KILL" },
        { label: "MULTI KILL", value: "MULTI KILL" },
        { label: "KILLING SPREE", value: "KILLING SPREE" },
        { label: "RAMPAGE", value: "RAMPAGE" },
        { label: "DOMINATING", value: "DOMINATING" },
        { label: "UNSTOPPABLE", value: "UNSTOPPABLE" },
        { label: "GODLIKE", value: "GODLIKE" },
        { label: "ULTRA KILL", value: "ULTRA KILL" },
        { label: "MONSTER KILL", value: "MONSTER KILL" },
        { label: "LUDICROUS KILL", value: "LUDICROUS KILL" },
        { label: "WICKED SICK", value: "WICKED SICK" },
        { label: "EXCELLENT", value: "EXCELLENT" },
        { label: "PERFECT", value: "PERFECT" },
        { label: "IMPRESSIVE", value: "IMPRESSIVE" },
        { label: "HOLY SHIT", value: "HOLY SHIT" },
        { label: "HUMILIATION", value: "HUMILIATION" },
        { label: "PREPARE TO FIGHT", value: "PREPARE TO FIGHT" },
        { label: "PLAY", value: "PLAY" }
      ]}
    />
  </Col>

  <Divider flush />

  <Col>
    <Button
      label="Play Achievement"
      onClickAction={{
        type: "play_quake_achievement"
      }}
      style="primary"
      block
    />
  </Col>
</Card>
