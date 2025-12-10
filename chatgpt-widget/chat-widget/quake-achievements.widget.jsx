<Card size="md">
  <Col>
    <Text
      value="🎮 Quake Coding Arena"
      size="lg"
      weight="semibold"
      color="emphasis"
    />
    <Text
      value="Celebrate coding victories with authentic Quake 3 Arena sounds"
      size="sm"
      color="secondary"
    />
  </Col>

  <Divider flush />

  <Col>
    <Text value="Select Achievement" size="sm" weight="medium" />
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
        { label: "BOTTOM FEEDER", value: "BOTTOM FEEDER" },
        { label: "PREPARE TO FIGHT", value: "PREPARE TO FIGHT" },
        { label: "PLAY", value: "PLAY" }
      ]}
    />
  </Col>

  <Divider flush />

  <Col>
    <Row align="center">
      <Col>
        <Text value="Voice Pack" size="sm" />
        <Select
          key="voice"
          placeholder="Auto"
          options={[
            { label: "Auto", value: "" },
            { label: "Male", value: "male" },
            { label: "Female", value: "female" }
          ]}
        />
      </Col>
      <Spacer />
      <Col>
        <Text value="Volume (0-100)" size="sm" />
        <Input
          key="volume"
          placeholder="80"
          defaultValue="80"
        />
      </Col>
    </Row>
  </Col>

  <Divider flush />

  <Col>
    <Button
      label="🎯 Play Achievement"
      onClickAction={{
        type: "play_quake_achievement"
      }}
      style="primary"
      block
    />
  </Col>

  <Divider flush />

  <Col>
    <Text value="Quick Select" size="md" weight="semibold" />
    <Row wrap={true}>
      <Button
        label="FIRST BLOOD"
        onClickAction={{
          type: "play_quake_achievement"
        }}
        style="secondary"
        size="sm"
      />
      <Button
        label="HEADSHOT"
        onClickAction={{
          type: "play_quake_achievement"
        }}
        style="secondary"
        size="sm"
      />
      <Button
        label="RAMPAGE"
        onClickAction={{
          type: "play_quake_achievement"
        }}
        style="secondary"
        size="sm"
      />
      <Button
        label="GODLIKE"
        onClickAction={{
          type: "play_quake_achievement"
        }}
        style="secondary"
        size="sm"
      />
      <Button
        label="WICKED SICK"
        onClickAction={{
          type: "play_quake_achievement"
        }}
        style="secondary"
        size="sm"
      />
      <Button
        label="PERFECT"
        onClickAction={{
          type: "play_quake_achievement"
        }}
        style="secondary"
        size="sm"
      />
      <Button
        label="EXCELLENT"
        onClickAction={{
          type: "play_quake_achievement"
        }}
        style="secondary"
        size="sm"
      />
    </Row>
  </Col>

  <Divider flush />

  <Col>
    <Row>
      <Text value="Status" size="sm" />
      <Spacer />
      <Text value="Ready to play achievements" size="sm" color="success" />
    </Row>
  </Col>
</Card>
