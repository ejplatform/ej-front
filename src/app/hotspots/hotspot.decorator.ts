export function Hotspot(hotspotName: string) {
    return (target: any) => {
        target['hotspot'] = hotspotName;
    };
}
