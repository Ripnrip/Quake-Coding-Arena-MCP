#!/bin/bash

# 🎭 The Enhanced Quake Sound Acquisition Ritual
#
# "Where we summon the missing 25 legendary Quake sounds to complete our arena!"
# - The Enhanced Quake Sound Collector

set -e

echo "🎯 ✨ DOWNLOADING MISSING QUAKE SOUNDS..."
echo "📊 Currently have 7 sounds, need 25 more for complete 32-sound arena!"
echo ""

# 🎪 Navigate to the enhanced arena
cd "$(dirname "$0")/sounds"

# 📋 List of missing sounds with suggested myinstants.com URLs
declare -A MISSING_SOUNDS=(
    ["killing-spree.mp3"]="https://www.myinstants.com/en/instant/killing-spree-26969/"
    ["perfect.mp3"]="https://www.myinstants.com/en/instant/perfect-4307/"
    ["impressive.mp3"]="https://www.myinstants.com/en/instant/impressive-5839/"
    ["double-kill.mp3"]="https://www.myinstants.com/en/instant/double-kill-26971/"
    ["triple-kill.mp3"]="https://www.myinstants.com/en/instant/triple-kill-26972/"
    ["quad-kill.mp3"]="https://www.myinstants.com/en/instant/quad-kill-26973/"
    ["monster-kill.mp3"]="https://www.myinstants.com/en/instant/monster-kill-26974/"
    ["ludicrous-kill.mp3"]="https://www.myinstants.com/en/instant/ludicrous-kill-26975/"
    ["holy-shit.mp3"]="https://www.myinstants.com/en/instant/holy-shit-26976/"
    ["first-blood.mp3"]="https://www.myinstants.com/en/instant/first-blood-26966/"
    ["headshot.mp3"]="https://www.myinstants.com/en/instant/headshot-26967/"
    ["combo-whore.mp3"]="https://www.myinstants.com/en/instant/combo-whore-26965/"
    ["payback.mp3"]="https://www.myinstants.com/en/instant/payback-26968/"
    ["revenge.mp3"]="https://www.myinstants.com/en/instant/revenge-26970/"
    ["denied.mp3"]="https://www.myinstants.com/en/instant/denied-26963/"
    ["team-kill.mp3"]="https://www.myinstants.com/en/instant/team-kill-26978/"
    ["prepare-to-fight.mp3"]="https://www.myinstants.com/en/instant/prepare-to-fight-26977/"
    ["the-lead.mp3"]="https://www.myinstants.com/en/instant/the-lead-26979/"
    ["tied-the-lead.mp3"]="https://www.myinstants.com/en/instant/tied-the-lead-26980/"
    ["taken-the-lead.mp3"]="https://www.myinstants.com/en/instant/taken-the-lead-26981/"
    ["red-team-takes-the-lead.mp3"]="https://www.myinstants.com/en/instant/red-team-takes-the-lead-26982/"
    ["blue-team-takes-the-lead.mp3"]="https://www.myinstants.com/en/instant/blue-team-takes-the-lead-26983/"
    ["quad-damage.mp3"]="https://www.myinstants.com/en/instant/quad-damage-26984/"
    ["armor.mp3"]="https://www.myinstants.com/en/instant/armor-26985/"
    ["health.mp3"]="https://www.myinstants.com/en/instant/health-26986/"
)

echo "🌙 ⚠️ MANUAL DOWNLOAD REQUIRED"
echo ""
echo "Due to website restrictions, please manually download these sounds:"
echo ""
echo "📋 MISSING SOUNDS (25 needed):"
echo ""

for sound_file in "${!MISSING_SOUNDS[@]}"; do
    if [[ ! -f "$sound_file" ]]; then
        echo "❌ $sound_file"
        echo "   🔗 ${MISSING_SOUNDS[$sound_file]}"
        echo ""
    else
        echo "✅ $sound_file (already downloaded)"
    fi
done

echo "🎯 QUICK DOWNLOAD INSTRUCTIONS:"
echo ""
echo "1. Visit each URL above"
echo "2. Click the download button (⬇️) next to the sound"
echo "3. Save to: $(pwd)"
echo "4. Make sure filename matches exactly (e.g., 'killing-spree.mp3')"
echo ""
echo "💡 PRO TIP: Open multiple tabs to download faster!"
echo ""
echo "🔄 ALTERNATIVE: Search these terms on myinstants.com:"
echo "   • 'killing spree quake'"
echo "   • 'perfect quake arena'"
echo "   • 'double kill quake'"
echo "   • 'first blood quake'"
echo "   • 'prepare to fight quake'"
echo ""

# Check current status
CURRENT_COUNT=$(ls *.mp3 2>/dev/null | wc -l)
echo "📊 CURRENT STATUS:"
echo "   Available sounds: $CURRENT_COUNT/32"
echo "   Still needed: $((32 - CURRENT_COUNT))"
echo ""

if [[ $CURRENT_COUNT -eq 32 ]]; then
    echo "🎉 ✅ COMPLETE! All 32 Quake sounds downloaded!"
    echo "🔄 Now update index.js to include all achievements"
    echo "📝 Run: sed -i.bak 's/Currently only including achievements with available sound files//' ../index.js"
else
    echo "🌙 Continue downloading to complete the enhanced arena!"
fi

echo ""
echo "🎯 Ready to DOMINATE with complete sound collection! 🎯"